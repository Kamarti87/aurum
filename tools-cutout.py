"""Подготовка фотографий техники для тёмного сайта.

Убирает белый студийный фон, гасит белый ореол на кромке и слегка затеняет край,
чтобы товар не выглядел наклеенным. Запуск:

    python3 tools-cutout.py исходник.jpg результат.webp

Требуется Pillow и numpy.
"""

from PIL import Image, ImageFilter
import numpy as np
from collections import deque

def flood_bg(mask):
    h, w = mask.shape
    bg = np.zeros((h, w), bool); q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if mask[y, x] and not bg[y, x]: bg[y, x] = True; q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if mask[y, x] and not bg[y, x]: bg[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not bg[ny, nx]:
                bg[ny, nx] = True; q.append((ny, nx))
    return bg

def shift(arr, dy, dx):
    out = np.zeros_like(arr)
    ys = slice(max(dy, 0), arr.shape[0] + min(dy, 0))
    xs = slice(max(dx, 0), arr.shape[1] + min(dx, 0))
    yd = slice(max(-dy, 0), arr.shape[0] + min(-dy, 0))
    xd = slice(max(-dx, 0), arr.shape[1] + min(-dx, 0))
    out[ys, xs] = arr[yd, xd]
    return out

def erode(m, r):
    for _ in range(r):
        m = m & shift(m,1,0) & shift(m,-1,0) & shift(m,0,1) & shift(m,0,-1)
    return m

def dilate(m, r):
    for _ in range(r):
        m = m | shift(m,1,0) | shift(m,-1,0) | shift(m,0,1) | shift(m,0,-1)
    return m

def background(near_white, seal=3):
    """Фон = белое, связанное с рамкой. Перед заливкой сужаем белую область,
    чтобы она не протекла в белый чек через узкий перешеек у края кадра,
    потом возвращаем ширину обратно."""
    pad = seal + 2
    nw = np.pad(near_white, pad, constant_values=True)
    seeded = erode(nw, seal)
    # эрозия съедает внешнее кольцо — возвращаем его как затравку заливки
    seeded[:seal, :] = seeded[-seal:, :] = True
    seeded[:, :seal] = seeded[:, -seal:] = True
    core = flood_bg(seeded)
    return (dilate(core, seal) & nw)[pad:-pad, pad:-pad]

def cutout(path, tol=6, grow=3):
    im = Image.open(path).convert('RGB')
    a = np.asarray(im).astype(np.float64)
    L, sat = a.mean(axis=2), a.max(axis=2) - a.min(axis=2)
    obj = ~background(a.min(axis=2) >= 255 - tol)

    # студийная тень под аппаратом
    h, w = L.shape
    dark = (L < 150) & obj
    ys = np.arange(h)[:, None]
    last_dark = np.where(dark.any(axis=0), (dark * ys).max(axis=0), -1)
    obj &= ~((ys > last_dark[None, :]) & (L > 185) & (sat < 22))

    # ядро без «замешанных» с фоном пикселей кромки
    core = erode(obj, 2)

    # деконтаминация: тянем цвет изнутри наружу, чтобы на краю не осталось белого
    filled, img = core.copy(), a.copy()
    for _ in range(grow):
        acc = np.zeros_like(img); cnt = np.zeros((h, w))
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)):
            n = shift(filled, dy, dx)
            acc += shift(img, dy, dx) * n[..., None]
            cnt += n
        new = (~filled) & (cnt > 0)
        img[new] = acc[new] / cnt[new][:, None]
        filled |= new

    # мягкое затемнение самой кромки: имитирует затенение на тёмном фоне
    # и гасит любой остаточный светлый кант
    # Затенение кромки. Широкая плавная растушёвка вглубь силуэта:
    # короткий жёсткий спад выглядел как обкусанный край, длинный читается
    # как естественная тень предмета на тёмном фоне.
    DEPTH = 14
    dist = obj.astype(np.int32)
    cur = obj.copy()
    for _ in range(DEPTH - 1):
        cur = erode(cur, 1)
        dist += cur
    t = np.clip(dist / DEPTH, 0.0, 1.0)
    base = 0.26 + 0.74 * t ** 0.75

    # Тёмный пластик затеняем в полную силу, светлую бумагу чека — слабее,
    # но уже не почти-нулём, иначе на тёмном фоне остаётся белый кант.
    Lc = img.mean(axis=2)
    weight = np.clip((215 - Lc) / 140, 0.75, 1.0)
    rim = 1 - (1 - base) * weight
    img *= np.where(obj, rim, 1.0)[..., None]

    alpha = Image.fromarray((erode(obj, 1) * 255).astype(np.uint8), 'L')
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.8))
    out = Image.fromarray(img.clip(0, 255).astype(np.uint8), 'RGB').convert('RGBA')
    out.putalpha(alpha)
    return out.crop(out.getbbox())


if __name__ == "__main__":
    import sys

    if len(sys.argv) != 3:
        raise SystemExit("использование: python3 tools-cutout.py вход.jpg выход.webp")
    cutout(sys.argv[1]).save(sys.argv[2], "WEBP", quality=92, method=6)
    print("готово:", sys.argv[2])
