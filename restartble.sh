#!/bin/sh
killall bluetoothd
rfkill unblock bluetooth
sleep 2
hciconfig hci0 up
sleep 2
hciconfig hci0 noleadv
sleep 2
hciconfig hci0 leadv