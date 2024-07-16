from airtest.core.api import *

def launch_app():
    PKG = "ru.somesoft.gdoc"
    stop_app(PKG)
    wake()
    start_app(PKG)

def login(poco):
    poco("android:id/text1").click()
    poco("android:id/text1").click()
    poco(text="1").click()
    poco(text="2").click()
    poco(text="3").click()
    poco(text="John Wilder").click()

def sign(poco):
    checkbox = Template(r"images/sign_checkbox.png", record_pos=(-0.425, -0.263), resolution=(1200, 1920))
    for x in range(6):
        if (exists(checkbox)):
            touch(checkbox)
        else:
            poco(text="Sign all").click()

# Function is necessary, because set_text doesn't wait for element appearance
# setText(poco(text="Login"), "someset87")
def setText(element, text):
    element.wait_for_appearance(timeout=12)
    element.set_text(text)
