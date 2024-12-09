import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingBar from "../components/ui/loading-bar";
import FormAddCategory from "../components/category/FormAddCategory";
import ListCategory from "../components/category/ListCategory";
import { AppDispatch, RootState } from "../features/store";
import { fetchCategoriesAsync } from "../features/categories/categorySlice";
import {
  deleteCategory,
  postCategory,
  updateCategory,
} from "../services/categoryService";

const Category = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );
  const [documentId, setDocumentId] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    const payload = {
      data: {
        name: category,
      },
    };

    setIsLoading(true);

    try {
      if (isEditing) {
        await updateCategory(documentId, payload);
      } else {
        await postCategory(payload);
      }

      dispatch(fetchCategoriesAsync());

      toast.success(
        isEditing
          ? "Berhasil memperbarui kategori !"
          : "Berhasil menambahkan kategori !"
      );
    } catch (error) {
      toast.error(
        isEditing
          ? "Gagal memperbarui kategori !"
          : "Gagal menambahkan kategori !"
      );
    } finally {
      setIsEditing(false);
      setIsLoading(false);
      setDocumentId("");
      setCategory("");
    }
  };

  const handleDeleteCategory = async (documentId: string) => {
    try {
      await deleteCategory(documentId);
      dispatch(fetchCategoriesAsync());

      toast.success("Berhasil menghapus kategori !");
    } catch (error) {
      toast.error("Gagal menghapus kategori !");
    }
  };

  const handleEditBtn = (data: { documentId: string; name: string }) => {
    setIsEditing(true);
    setDocumentId(data.documentId);
    setCategory(data.name);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDocumentId("");
    setCategory("");
  };

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <div className="relative flex flex-col w-full gap-4 p-4 md:gap-8 md:p-8 h-dvh">
      <LoadingBar loading={loading} />
      <FormAddCategory
        handleCancelEdit={handleCancelEdit}
        isEditing={isEditing}
        category={category}
        setCategory={setCategory}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />
      <ListCategory
        documentId={documentId}
        handleEditCategory={handleEditBtn}
        categories={categories?.data}
        handleDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
};

export default Category;
