class CreateWorkitems < ActiveRecord::Migration
  def change
    create_table :workitems do |t|
      t.string :title
      t.string :info
      t.text :about
      t.integer :artist_id

      t.timestamps
    end
  end
end
