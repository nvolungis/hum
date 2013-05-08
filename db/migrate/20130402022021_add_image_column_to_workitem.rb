class AddImageColumnToWorkitem < ActiveRecord::Migration
  def change
    add_attachment :workitems, :image
  end
end

