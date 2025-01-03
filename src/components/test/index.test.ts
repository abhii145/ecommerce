import {
  AddressForm,
  Breadcrumbs,
  CartItem,
  CartSummary,
  CategoryCard,
  CategoryFilter,
  EmptyState,
  Footer,
  Header,
  Hero,
  MobileMenu,
  NotFound,
  Pagination,
  ProductCard,
  SearchBar,
  SortBy,
} from "../index"

describe("Component Imports", () => {
  it("should import all components correctly", () => {
    expect(AddressForm).toBeDefined()
    expect(Breadcrumbs).toBeDefined()
    expect(CartItem).toBeDefined()
    expect(CartSummary).toBeDefined()
    expect(CategoryCard).toBeDefined()
    expect(CategoryFilter).toBeDefined()
    expect(EmptyState).toBeDefined()
    expect(Footer).toBeDefined()
    expect(Header).toBeDefined()
    expect(Hero).toBeDefined()
    expect(MobileMenu).toBeDefined()
    expect(NotFound).toBeDefined()
    expect(Pagination).toBeDefined()
    expect(ProductCard).toBeDefined()
    expect(SearchBar).toBeDefined()
    expect(SortBy).toBeDefined()
  })
})