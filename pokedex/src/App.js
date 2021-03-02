import React, { Component } from "react";
import "./App.scss";
import { SearchBox } from "./components/search-box/search-box.component";
import { Header } from "./components/header/header.component";
import { CardList } from "./components/card-list/card-list.component";

/** Images */
import togepi from "./assets/togepi_404.gif";
import squirtle from "./assets/squirtleSquad_404.gif";
import pikachu from "./assets/pikachu_404.gif";
import cyndaquil from "./assets/cyndaquil_404.gif";
import gengar from "./assets/gengarFight_404.gif";
import ghastly from "./assets/ghastly_404.gif";
import mew from "./assets/mew_404.gif";
import skitty from "./assets/skitty_404.gif";
import { Pagination } from "./components/pagination/pagination.component";

class App extends Component {
  constructor() {
    super();
    this.initialPageLoad = true;
    this.nextNumberOfPokemon = 24;
    this.isNextPageBtnShowing = true;
    this.isPrevPageBtnShowing = false;
    this.currentNumberOfPokes = 0;

    this.baseUrl = "https://pokeapi.co/api/v2/pokemon/?limit=24";

    this.state = {
      allPokemon: [],
      searchField: "",
      noPokemon: [
        { text: "Nothing but a Togepi in sight.", src: togepi },
        {
          text: "You didn't find your pokemon, but you found your squad!",
          src: squirtle,
        },
        { text: "Pika Pika means try again.", src: pikachu },
        { text: "RAGE! No search results!", src: cyndaquil },
        { text: "Lookin' for a fight? No? Okay.", src: gengar },
        { text: "No pokemon found? Now that's ghastly.", src: ghastly },
        { text: "No pokemon for you. How about a mew?", src: mew },
        { text: "Time for a nap.", src: skitty },
      ],
      isNextLoading: false,
      isPrevLoading: false,
      isDarkMode: false,
    };

    /** Bound methods */
    this.loadMorePokemon = this.loadMorePokemon.bind(this);
    this.loadLessPokemon = this.loadLessPokemon.bind(this);
    this.fetchDetails = this.fetchDetails.bind(this);
    this.handleDarkMode = this.handleDarkMode.bind(this);
  }

  componentDidMount() {
    this.getPokemon();
  }

  getPokemon() {
    fetch(this.baseUrl)
      .then((response) => response.json())
      .then((allPokemon) => {
        allPokemon.results.forEach((pokemon) => {
          this.fetchDetails(pokemon, true);
        });
      });
  }

  fetchDetails(pokemon) {
    /** Reset the allPokemon[] */
    this.setState({ allPokemon: [] });

    fetch(pokemon.url)
      .then((response) => response.json())
      .then((pokeData) => {
        this.setState({
          allPokemon: this.state.allPokemon
            .concat(pokeData)
            .sort((a, b) => a.id - b.id),
          isNextLoading: false,
          isPrevLoading: false,
        });
      });
  }

  loadMorePokemon() {
    if (this.initialPageLoad) {
      this.initialPageLoad = false;
    } else {
      this.currentNumberOfPokes = this.nextNumberOfPokemon;
      this.nextNumberOfPokemon = this.showMorePokemon(
        this.currentNumberOfPokes
      );
    }

    const morePokemonUrl =
      `https://pokeapi.co/api/v2/pokemon/?limit=24&offset=` +
      `${this.nextNumberOfPokemon}`;

    this.isPrevPageBtnShowing = true;
    this.isNextPageBtnShowing = this.nextNumberOfPokemon === 127 ? false : true;
    this.fetchPokemon(morePokemonUrl, true);
  }

  loadLessPokemon() {
    //** If we went to end of pages, we need to remove the extra 7 */
    this.currentNumberOfPokes =
      this.nextNumberOfPokemon === 127
        ? (this.nextNumberOfPokemon -= 7)
        : this.nextNumberOfPokemon;

    /** Update current number */
    this.nextNumberOfPokemon = this.showLessPokemon(this.currentNumberOfPokes);

    const lessPokemonUrl =
      `https://pokeapi.co/api/v2/pokemon/?limit=24&offset=` +
      `${this.nextNumberOfPokemon}`;

    this.isNextPageBtnShowing = true;
    this.isPrevPageBtnShowing = this.nextNumberOfPokemon === 0 ? false : true;
    this.fetchPokemon(lessPokemonUrl, false);
  }

  showLessPokemon(count) {
    return count - 24;
  }

  showMorePokemon(count) {
    return count === 96 ? count + 7 : count + 24;
  }

  fetchPokemon(url, isNextBtn) {
    if (isNextBtn) {
      this.setState({ isNextLoading: true, isPrevLoading: false });
    } else {
      this.setState({ isNextLoading: false, isPrevLoading: true });
    }

    this.fetchOffsetDetails(url);
  }

  fetchOffsetDetails(offsetUrl) {
    fetch(offsetUrl)
      .then((response) => response.json())
      .then((offsetPokemon) => {
        offsetPokemon.results.forEach((pokemon) => {
          this.fetchDetails(pokemon, true);
        });
      });
  }

  /** Using lexical scoping to bind 'this' */
  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  handleDarkMode() {
    this.setState((state) => ({
      isDarkMode: !state.isDarkMode,
    }));
  }

  render() {
    /** Search */
    const { allPokemon, searchField, isDarkMode } = this.state;

    const filteredPokemon = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchField.toLowerCase())
    );

    /** Randomize 404 images */
    const randomInt = Math.floor(Math.random() * this.state.noPokemon.length);
    this.randomPokemonIndex = this.state.noPokemon[randomInt];

    return (
      <div className={this.state.isDarkMode ? "app--dark-mode" : "app"}>
        <Header headerText="pokedex"></Header>

        <div className="app__tools">
          <SearchBox
            placeholder="Search Pokemon"
            handleChange={this.handleChange}
          ></SearchBox>

          <button
            className={
              this.state.isDarkMode ? "app__btn--dark-mode" : "app__btn"
            }
            type="button"
            title="Toggle Shiny Pokemon"
            onClick={this.handleDarkMode}
          >
            {this.state.isDarkMode ? "SHINY ON" : "SHINY OFF"}
          </button>
        </div>

        {filteredPokemon.length === 0 ? (
          <div className="not-found">
            <img
              className="not-found__img"
              alt="Random Pokemon 404"
              src={this.randomPokemonIndex.src}
            />

            <p className="not-found__text">{this.randomPokemonIndex.text}</p>
          </div>
        ) : (
          <CardList
            pokemon={filteredPokemon}
            isDarkMode={isDarkMode}
          ></CardList>
        )}

        {filteredPokemon.length > 0 && (
          <Pagination
            isPrevLoading={this.state.isPrevLoading}
            isNextLoading={this.state.isNextLoading}
            isPrevPageBtnShowing={this.isPrevPageBtnShowing}
            isNextPageBtnShowing={this.isNextPageBtnShowing}
            loadLessPokemon={this.loadLessPokemon}
            loadMorePokemon={this.loadMorePokemon}
          ></Pagination>
        )}
      </div>
    );
  }
}

export default App;
