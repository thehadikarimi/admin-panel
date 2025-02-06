import AddCategoryForm from "@/components/modules/Forms/Category/AddCategoryForm";
import CategoriesTable from "@/components/modules/Tables/CategoriesTable";

function CategoryPage() {
  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <div className="c-container">
        <h2 className="title">افزودن دسته بندی</h2>
        <AddCategoryForm />
      </div>
      <div className="c-container">
        <h2 className="title">لیست دسته بندی ها</h2>
        <CategoriesTable />
      </div>
    </div>
  );
}

export default CategoryPage;
