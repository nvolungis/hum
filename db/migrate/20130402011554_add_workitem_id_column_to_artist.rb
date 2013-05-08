class AddWorkitemIdColumnToArtist < ActiveRecord::Migration
  def change
    add_column :artists, :workitem_id, :integer
  end
end
