class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :name
      t.text :info
      t.text :about

      t.timestamps
    end
  end
end
