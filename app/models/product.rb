class Product
  include MongoMapper::Document

  key :name, String, :required => true
  key :slug, String
  key :category, String, :required => true
  key :tags, Array

  ensure_index :name
  ensure_index :category
  ensure_index :tags

  after_validation :on => :create do
    self.create_slug
  end

  def self.find_by_slug slug
    first :conditions => { :slug => slug }
  end

  # todo: fix subjectivity to race conditions
  # generates a slug only if one hasn't been generated already
  def create_slug
    return if self.name.blank?
    return if self.slug
    tail, count = "", 1
    initial = convert_to_slug self.name
    while Product.find_by_slug (initial + tail) do
      count += 1
      tail = "-#{count}"
    end
    self.slug = initial + tail
  end

  def add_attrs(attrs)
    attrs.each do |var, value|
      class_eval { attr_accessor var }
      instance_variable_get "@#{var}"
      instance_variable_set "@#{var}", value
    end
  end

  def to_param
    self.slug || self.id
  end

  private

  def convert_to_slug(str)
    if defined?(ActiveSupport::Inflector.parameterize)
      ActiveSupport::Inflector.parameterize(str).to_s
    else
      ActiveSupport::Multibyte::Handlers::UTF8Handler.
        normalize(str,:d).split(//u).
        reject { |e| e.length > 1 }.
        join.strip.gsub(/[^a-z0-9]+/i, '-').
        downcase.gsub(/-+$/, '')
    end
  end
end
