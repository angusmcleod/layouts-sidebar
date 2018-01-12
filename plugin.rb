# name: layouts-sidebars
# about: A sidebar widget that works with discourse-layouts
# version: 0.1

register_asset 'stylesheets/layouts-sidebar.scss'

DiscourseEvent.on(:layouts_ready) do
  DiscourseLayouts::WidgetHelper.add_widget('sidebar', position: 'left', order: 'start')
end