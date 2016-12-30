class CreateSuggestions < ActiveRecord::Migration
  def change
    create_table :suggestions do |t|
      t.string :title, null: false
      t.text :body
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :suggestions, :user_id
  end
end
