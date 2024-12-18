import PageHeader from "@/components/layout/PageHeader";
import CategoryForm from "../_components/CategoryForm";

const AddNewCategory = async () => {
  return (
    <div>
      <PageHeader>add new category</PageHeader>

      <CategoryForm />
    </div>
  );
};

export default AddNewCategory;
