from behave import given, when, then
from behave.runner import Context
from gh_tap_back.dog import Dog


@given("there's a Coco")
def step_impl(context: Context):
    context.coco = Dog(name="Coco", friends=["Gorda", "Gordo"])


@when("she barks")
def step_impl(context: Context):
    context.bark = context.coco.bark()


@then("greets all her friends")
def step_impl(context: Context):
    print(context.bark)
    assert context.bark == "*WOOF* GORDA *WOOF* GORDO!!!"
