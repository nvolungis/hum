class Submission < ActiveRecord::Base
  attr_accessible :about, :f_name, :l_name, :location, :workitem_submission_id, :workitem_submissions_attributes
  has_many :workitem_submissions
  accepts_nested_attributes_for :workitem_submissions
  validates :f_name, :l_name, :presence => true
end
