#!/bin/sh
rfkill unblock bluetooth
hciconfig hci0 up
printf 'src/gz all http://repo.opkg.net/edison/repo/all' 'src/gz edison http://repo.opkg.net/edison/repo/edison' 'src/gz core2-32 http://repo.opkg.net/edison/repo/core2-32' >> /etc/opkg/base-feeds.conf
opkg update
opkg install bluez5-dev
opkg install git