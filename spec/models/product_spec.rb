require 'spec_helper'

describe Product do
  def products
    [ { :name => "milk 1%", :tags => %w(dairy altadena) },
      { :name => "half and half", :tags => %w(dairy breakfast ralphs) },
      { :name => "vanilla yogurt", :tags => %w(dairy breakfast altadena) },
      { :name => "creamer", :tags => %w(breakfast non-dairy johnson) } ]
  end

  def create_products
    products.each { |p| Product.create! p }
  end

  it "should generate a slug for a new product" do
    product = Product.create :name => "test prod"
    product.slug.should eq 'test-prod'
  end

  it "should get product by name" do
    create_products
    milk = Product.all :name => /milk/
    milk.count.should eq 1
  end

  it "should get product by tags" do
    create_products
    dairy = Product.all :tags => "dairy"
    dairy.count.should eq 3
  end

  it "should insert product with id" do
    Product.create! :name => "autogen id", :tags => [], :id => "myuniqueid"
    products = Product.all :name => "autogen id"
    products.count.should eq 1
    products[0].id.should eq "myuniqueid"
  end
end
