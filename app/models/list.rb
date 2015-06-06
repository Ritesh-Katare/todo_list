class List < ActiveRecord::Base
  validates :name, presence: true
  has_many :items, :dependent => :delete_all
end
