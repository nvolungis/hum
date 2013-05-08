class CreateWorkitemSubmissions < ActiveRecord::Migration
  def change
    create_table :workitem_submissions do |t|
      t.string :title
      t.string :year
      t.string :medium
      t.text :comments
      t.text :link

      t.timestamps
    end
  end
end
