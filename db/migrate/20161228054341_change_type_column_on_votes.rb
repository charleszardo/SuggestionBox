class ChangeTypeColumnOnVotes < ActiveRecord::Migration
  def change
    rename_column :votes, :type, :upvote
    change_column :votes, :upvote, 'boolean USING CAST(upvote AS boolean)'
  end
end
