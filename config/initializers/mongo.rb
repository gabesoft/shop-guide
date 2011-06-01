db_name = 'shop-guide-db'

if ENV['MONGOHQ_URL']
  MongoMapper.config = { RAILS_ENV => { 'uri' => ENV['MONGOHQ_URL'] } }
else 
  MongoMapper.config = { RAILS_ENV => { 'uri' => "mongodb://localhost:27017/#{db_name}-#{Rails.env}" } }
end

MongoMapper.connect(RAILS_ENV)
