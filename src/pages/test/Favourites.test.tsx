import { render, screen, fireEvent, act } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import configureStore from "redux-mock-store"
import Favorites from "../Favourites"
import { removeFromFavorites } from "../../store/favoritesSlice"
import { RootState } from "../../store/store"

const mockStore = configureStore([])

describe("Favorites Page", () => {
  let store: ReturnType<typeof mockStore>
  let initialState: RootState

  beforeEach(() => {
    initialState = {
      favorites: {
        items: [
          {
            id: 1,
            title: "Product 1",
            price: 100,
            description: "Description 1",
            thumbnail: "thumbnail1.jpg",
            rating: 4.5,
          },
        ],
      },
      _persist: {
        version: 1,
        rehydrated: true,
      },
    }
    store = mockStore(initialState)
  })

  it("renders favorite products", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <Favorites />
          </Router>
        </Provider>
      )
    })

    expect(screen.getByText((content) => content.includes("Your Favorite Products"))).toBeInTheDocument()
    expect(screen.getByText("Product 1")).toBeInTheDocument()
  })

  it("renders empty state when no favorites", async () => {
    initialState.favorites.items = []
    store = mockStore(initialState)

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <Favorites />
          </Router>
        </Provider>
      )
    })

    expect(screen.getByText((content) => content.includes("You have no favorite products"))).toBeInTheDocument()
    expect(screen.getByText("You haven’t added any favourites yet.")).toBeInTheDocument()
    expect(screen.getByText("Shop Now")).toBeInTheDocument()
  })

  it("deletes a favorite product", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <Favorites />
          </Router>
        </Provider>
      )
    })

    fireEvent.click(screen.getByTestId("delete-favorite"))

    const actions = store.getActions()
    expect(actions).toContainEqual(removeFromFavorites(1))
  })

  it("navigates to products page on Shop Now button click", async () => {
    initialState.favorites.items = []
    store = mockStore(initialState)

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <Favorites />
          </Router>
        </Provider>
      )
    })

    fireEvent.click(screen.getByText("Shop Now"))

    expect(window.location.pathname).toBe("/products")
  })
})
