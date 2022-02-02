import React from 'react';
import { IPageProps } from '@educt/interfaces';
import { Page } from '@educt/components/PageElements';
import { CategoryTableList, CategoryTableRow } from '@educt/components/Tables/CategoryTableList';
import LoadingPage from '@educt/components/LoadingPage';

/**
 * Hooks
 */
import { useFetchCategories } from '@educt/hooks/queries';

/**
 * Categories page
 */
const CategoriesPage: React.FC<IPageProps> = () => {
  const { isLoading, data: categories } = useFetchCategories();

  if (isLoading || categories === null) return <LoadingPage />;

  return (
    <Page>
      <Page.Heading heading='Categories' description='Edit categories in the system.' />
      <Page.Content>
        <CategoryTableList categories={categories} render={CategoryTableRow} />
      </Page.Content>
    </Page>
  );
};

export default CategoriesPage;
