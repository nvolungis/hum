class CreateTheworks < ActiveRecord::Migration
  def change
    create_table :theworks do |t|
      t.text :body
      t.integer :artist_id

      t.timestamps
    end
  end
end
