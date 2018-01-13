# name: layouts-sidebars
# about: A sidebar widget that works with discourse-layouts
# version: 0.1

register_asset 'stylesheets/layouts-sidebar.scss'

DiscourseEvent.on(:layouts_ready) do
  # To be removed
  DiscourseLayouts::WidgetHelper.clear_widget('sidebar')

  DiscourseLayouts::WidgetHelper.add_widget('user-sidebar', position: 'left', order: 'start')
end
