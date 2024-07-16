import logging
from airtest.core.api import *
from poco.drivers.android.uiautomation import AndroidUiautomationPoco
from common import login, launch_app

def call_card_therapist(poco):
    try:
        launch_app()
        login(poco)

        poco(text="Sonny Born").click()
        poco("ru.somesoft.gdoc:id/takeIt").click()

        for x in range(3):
            touch(Template(r"images/sign_checkbox.png", record_pos=(-0.425, -0.263), resolution=(1200, 1920)))
        poco("ru.somesoft.gdoc:id/docsRecycleView").swipe([-0.0659, -0.5151])
        poco(text="Reset values").wait_for_appearance(3)
    except Exception as e:
        logging.exception(e)
