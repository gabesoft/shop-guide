require 'spec_helper'

describe Product do
  it "should generate a slug for a new product" do
    product = Product.create :name => "test prod"
    product.slug.should eq 'test-prod'
  end
end
