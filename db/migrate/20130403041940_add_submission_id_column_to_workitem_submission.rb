class AddSubmissionIdColumnToWorkitemSubmission < ActiveRecord::Migration
  def change
    add_column :workitem_submissions, :submission_id, :integer
  end
end
