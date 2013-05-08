class WorkitemSubmission < ActiveRecord::Base
  attr_accessible :comments, :link, :medium, :title, :year
  
  belongs_to :submission
end