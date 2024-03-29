import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import "./pagination.styles.scss";

const spinner = css`
  display: block;
  margin: 0 auto;
  border-color: $color-lazer-blue;
`;

export const Pagination = ({
  loadMorePokemon,
  loadLessPokemon,
  isNextPageBtnShowing,
  isPrevPageBtnShowing,
  isPrevLoading,
  isNextLoading,
}) => (
  /** Functional component */
  /** Fragments let you group a list of children without adding extra nodes to the DOM. */

  <React.Fragment>
    {isPrevPageBtnShowing && (
      <button
        className="load-less__btn"
        type="button"
        onClick={loadLessPokemon}
      >
        {isPrevLoading ? (
          <ClipLoader size={15} css={spinner} margin={2} />
        ) : (
          <span>prev page</span>
        )}
      </button>
    )}

    {isNextPageBtnShowing && (
      <button
        className="load-more__btn"
        type="button"
        onClick={loadMorePokemon}
      >
        {isNextLoading ? (
          <ClipLoader size={15} css={spinner} margin={2} />
        ) : (
          <span>next page</span>
        )}
      </button>
    )}
  </React.Fragment>
);
