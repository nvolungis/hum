class AddTheworkIdColumnToArtist < ActiveRecord::Migration
  def change
    add_column :artists, :thework_id, :integer
  end
end
