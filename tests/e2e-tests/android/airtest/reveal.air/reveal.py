# -*- encoding=utf8 -*-
__author__ = "Hofls"

from airtest.core.api import *
from poco.drivers.android.uiautomation import AndroidUiautomationPoco
poco = AndroidUiautomationPoco(screenshot_each_action=False)
auto_setup(__file__)

PWD = os.path.dirname(__file__)
PKG = "at.markushi.reveal"
APK = os.path.join(PWD, "MarkReveal.apk")

if PKG not in device().list_app():
    install(APK)

stop_app(PKG)
wake()
start_app(PKG)

poco("at.markushi.reveal:id/slow_motion").click()
poco("at.markushi.reveal:id/btn_1").click()
poco("at.markushi.reveal:id/btn_2").click()
poco("at.markushi.reveal:id/btn_3").click()
poco("at.markushi.reveal:id/action").click()

log("Test done!")
sleep(2)
stop_app(PKG)