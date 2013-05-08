class CreateSubmissions < ActiveRecord::Migration
  def change
    create_table :submissions do |t|
      t.string :f_name
      t.string :l_name
      t.string :location
      t.text :about
      t.integer :workitem_submission_id

      t.timestamps
    end
  end
end
