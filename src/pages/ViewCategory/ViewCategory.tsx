import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "components/Button/Button.tsx";
import { useAppDispatch, useAppSelector } from "store/hooks.ts";
import {
  categoryOneDataSliceSelectors,
  categorysOneDataSliceActions,
} from "store/redux/categoryOne/categoryOneSlice.ts";
import { Img } from "pages/ViewOffer/styles.ts";

import {
  CategoryButtonWrapper,
  CategoryButtonsWrapper,
  CategoryITW,
  CategoryImageWrapper,
  CategoryInfoWrapper,
  CategoryLeftWrapper,
  CategoryWrapper,
  HomeContainer,
  HomeWrapper,
  OfferTextAreaWrapper,
  TextAreaWrapper,
  Tile,
  TileStatus,
} from "./style.ts";

function ViewCategory() {
  const { id = "" } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const categoryOneSlice = useAppSelector(
    categoryOneDataSliceSelectors.category,
  );
  const categoryData = categoryOneSlice;

  useEffect(() => {
    dispatch(categorysOneDataSliceActions.getCategoryById(id));
  }, [dispatch, id]);

  const handleCancel = () => {
    navigate("/admin/categories/all");
  };

  const handleEdit = () => {
    navigate(`/admin/categories/edit/${id}`);
  };

  const handleHide = (categoryId: string) => {
    dispatch(categorysOneDataSliceActions.hideCategoryById(categoryId))
      .then((response) => {
        console.log("hideCategoryById response:", response);
      })
      .catch((error) => {
        console.error("hideCategoryById error:", error);
      });
    navigate(`/admin/categories/${id}`);
  };

  const handleActive = (categoryId: string) => {
    dispatch(categorysOneDataSliceActions.activateCategoryById(categoryId))
      .then((response) => {
        console.log("hideCategoryById response:", response);
      })
      .catch((error) => {
        console.error("hideCategoryById error:", error);
      });
    navigate(`/admin/categories/${id}`);
  };

  return (
    <HomeWrapper>
      <HomeContainer>
        <CategoryWrapper>
          <CategoryInfoWrapper>
            <CategoryImageWrapper>
              <Img />
            </CategoryImageWrapper>
            <CategoryLeftWrapper>
              <CategoryITW>
                <Tile>Name: </Tile>
                <TileStatus>{categoryData.data.name || ""}</TileStatus>
              </CategoryITW>
              <CategoryITW>
                <Tile>Description: </Tile>
              </CategoryITW>
              <OfferTextAreaWrapper>
                <TextAreaWrapper>
                  {categoryData.data.description || ""}
                </TextAreaWrapper>
              </OfferTextAreaWrapper>
              <CategoryITW>
                <Tile>Status: </Tile>
                <TileStatus>
                  {categoryData.data.active ? "aktive" : "inactive"}
                </TileStatus>
              </CategoryITW>
            </CategoryLeftWrapper>
          </CategoryInfoWrapper>
          <CategoryButtonsWrapper>
            {categoryData.data.active ? (
              <CategoryButtonWrapper>
                <Button
                  type="button"
                  background="#7b001c"
                  name="Hide"
                  onButtonClick={() =>
                    handleHide(categoryData.data.id.toString())
                  }
                />
              </CategoryButtonWrapper>
            ) : (
              <CategoryButtonWrapper>
                <Button
                  type="button"
                  background="#0A5F38"
                  name="Activation"
                  onButtonClick={() =>
                    handleActive(categoryData.data.id.toString())
                  }
                />
              </CategoryButtonWrapper>
            )}
            <CategoryButtonWrapper>
              <Button
                type="button"
                background="#0A5F38"
                name="Edit"
                onButtonClick={handleEdit}
              />
            </CategoryButtonWrapper>
            <CategoryButtonWrapper>
              <Button
                type="button"
                background="grey"
                name="Back"
                onButtonClick={handleCancel}
              />
            </CategoryButtonWrapper>
          </CategoryButtonsWrapper>
        </CategoryWrapper>
      </HomeContainer>
    </HomeWrapper>
  );
}

export default ViewCategory;
