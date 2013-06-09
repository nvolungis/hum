class Artist < ActiveRecord::Base
  attr_accessible :about, :info, :name, :image, :workitems_attributes
  has_attached_file :image, :styles => { :thumb => "240x240>" }
  belongs_to :thework
  has_many :workitems
  accepts_nested_attributes_for :workitems
end
