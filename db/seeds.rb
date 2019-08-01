# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
table = CSV.read("#{Rails.root}/lib/assets/games-features.csv", headers: true)

Game.destroy_all

array_of_hashes = []
table.each do |row|
  temp_hash = {}
  temp_hash[:title] = row[3]
  temp_hash[:description] = row[64]
  temp_hash[:release_date] = row[4]
  temp_hash[:price] = row[58]
  array_of_hashes << temp_hash
end

(1...13000).each {|num| Game.create(array_of_hashes[num])}