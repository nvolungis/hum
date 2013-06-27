module ApplicationHelper
  def link_to_add_fields(name, f, association, className = '', container = '')
    new_object = f.object.send(association).klass.new
    id = new_object.object_id

    fields = f.fields_for(association, new_object, child_index: id) do |builder|
      render(association.to_s.singularize + "_fields", f: builder )
    end
    
    link_to(name, '#', class: "add_fields " + className, data: {id: id, container: container, fields:fields.gsub('\n', '')}) 
  end
  
  def format_id(str)
    str.downcase.gsub(" ", "_")
  end
  
  
  def get_header_image
  	number = rand(5) + 1
  	
  	"/assets/header-texture-#{number}.jpg"
  end
end
