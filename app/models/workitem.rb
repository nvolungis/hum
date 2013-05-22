class Workitem < ActiveRecord::Base
  attr_accessible :about, :info, :title, :image
  
  belongs_to :artist
  has_attached_file :image, :styles => { :thumb => "100x100>", :accordion => '700x480#' } 
end
