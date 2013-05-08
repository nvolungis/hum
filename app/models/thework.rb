class Thework < ActiveRecord::Base
  attr_accessible :artist_ids, :body
  
  has_many :artists
end
