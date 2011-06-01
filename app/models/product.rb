class Product
  include MongoMapper::Document

  key :name, String, :required => true
  key :slug, String
  #key :tags, Array

  after_validation :on => :create do
    self.create_slug
  end

  def self.find_by_slug slug
    first :conditions => { :slug => slug }
  end

  def to_param
    self.slug || self.id
  end

  def convert_to_slug(str)
    if defined?(ActiveSupport::Inflector.parameterize)
      ActiveSupport::Inflector.parameterize(str).to_s
    else
      ActiveSupport::Multibyte::Handlers::UTF8Handler.
        normalize(str,:d).split(//u).reject { |e| e.length > 1 }.join.strip.gsub(/[^a-z0-9]+/i, '-').downcase.gsub(/-+$/, '')
    end
  end

  # todo: fix subjectivity to race conditions
  #       make sure the generated slug is url encoded
  def create_slug
    return if self.name.blank?
    tail, count = "", 1
    initial = convert_to_slug self.name
    while Product.find_by_slug (initial + tail) do
      count += 1
      tail = "-#{int}"
    end
    self.slug = initial + tail
  end
end
