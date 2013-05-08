class CreateMissions < ActiveRecord::Migration
  def change
    create_table :missions do |t|
      t.text :body
      t.text :statement

      t.timestamps
    end
  end
end
