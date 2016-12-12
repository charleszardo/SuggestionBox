class Comment < ActiveRecord::Base
  validates :suggestion, :body, presence: true
end
