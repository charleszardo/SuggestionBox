class AddPolymorphismToVotes < ActiveRecord::Migration
  def change
    rename_column :votes, :suggestion_id, :voteable_id
    add_column :votes, :voteable_type, :string
    add_index :votes, [:voteable_id, :voteable_type]
  end
end
