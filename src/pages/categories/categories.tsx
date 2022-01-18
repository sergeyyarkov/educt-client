import React from 'react';
import { IPageProps } from '@educt/interfaces';
import { PageContent, PageHeading, PageWrapper } from '@educt/components/PageElements';
import { CategoryTableList, CategoryTableRow } from '@educt/components/Tables/CategoryTableList';
import { useFetchCategories } from '@educt/hooks/queries';
import LoadingPage from '@educt/components/LoadingPage';

/**
 * Categories page
 */
const CategoriesPage: React.FC<IPageProps> = () => {
  const { isLoading, data: categories } = useFetchCategories();

  if (isLoading || categories === null) return <LoadingPage />;

  return (
    <PageWrapper>
      <PageHeading heading='Categories' description='Edit categories in the system.' />
      <PageContent>
        <CategoryTableList categories={categories} render={CategoryTableRow} />
      </PageContent>
    </PageWrapper>
  );
};

export default CategoriesPage;
