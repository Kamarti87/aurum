#!/usr/bin/env bash
# Разовая подготовка сервера под aurum-msk.ru. Запускается от root,
# повторный запуск ничего не ломает. Нужны: репозиторий Kamarti87/aurum
# с добавленным deploy key и записи DNS на 82.146.47.73.
set -euo pipefail

id aurum >/dev/null 2>&1 ||
  useradd --system --home-dir /srv/aurum --no-create-home --shell /usr/sbin/nologin aurum

# /etc/aurum: ключ читает aurum (от него идёт git), env — только root
install -d -m 750 -o root -g aurum /etc/aurum
[ -f /etc/aurum/deploy_key ] ||
  ssh-keygen -q -t ed25519 -N "" -C "aurum-deploy@kamarti.fvds.ru" -f /etc/aurum/deploy_key
chown aurum:aurum /etc/aurum/deploy_key /etc/aurum/deploy_key.pub
chmod 600 /etc/aurum/deploy_key
[ -f /etc/aurum/known_hosts ] || ssh-keyscan -t ed25519 github.com > /etc/aurum/known_hosts 2>/dev/null
chmod 644 /etc/aurum/known_hosts
[ -f /etc/aurum/aurum.env ] || install -m 600 /dev/stdin /etc/aurum/aurum.env <<'ENV'
SITE_URL=https://aurum-msk.ru
ALLOW_INDEXING=false
ENV

SSH_CMD="ssh -i /etc/aurum/deploy_key -o IdentitiesOnly=yes -o UserKnownHostsFile=/etc/aurum/known_hosts -o StrictHostKeyChecking=yes"
install -d -o aurum -g aurum /srv/aurum
if [ ! -d /srv/aurum/.git ]; then
  runuser -u aurum -- git -c core.sshCommand="$SSH_CMD" clone --quiet git@github.com:Kamarti87/aurum.git /srv/aurum
  runuser -u aurum -- git -C /srv/aurum config core.sshCommand "$SSH_CMD"
fi
