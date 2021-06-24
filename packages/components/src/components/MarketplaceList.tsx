import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { Modal } from './Modal';

import {
  Container,
  Placeholder,
  Title,
  Table,
  TableBody,
  TableHeader,
  TableItem,
  TableItemButton,
  TableItemDate,
  TableItemImage,
  TableItemInfo,
  TablePagination,
  Wrapper,
} from './MarketplaceList.styles';

import {
  IMarketplaceListProps,
  IMarketplaceItemsProps,
  IMarketplaceItemProps,
} from '../types/components';
import { ThemeContext } from '../helpers/theme';
import { marketplaceThemedAssets } from '../helpers/assets';
import { toggleLockBodyScroll } from '../helpers/modals';

const TableItems: React.FC<IMarketplaceItemsProps> = ({
  icon,
  items,
  handleModal,
  setCurrentItem,
  ...restProps
}) => {
  const formateDate = (value: string) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const date = new Date(value);
    return `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;
  };

  return (
    <>
      {items &&
        items.map((item) => (
          <TableItem key={item.title}>
            <td>{item.image && <TableItemImage {...item.image} {...restProps.imageProps}/>}</td>
            <td>
              <TableItemInfo>
                <a
                  {...(item.link
                    ? item.link
                    : {
                        onClick: () => {
                          setCurrentItem(item);
                          handleModal(true);
                        },
                      })}
                  {...restProps.linkProps}
                >
                  <span>
                    <h3 {...restProps.titleProps}>{item.title}</h3>
                    <p {...restProps.descriptionProps}>{item.description}</p>
                  </span>
                </a>
              </TableItemInfo>
            </td>
            <td>
              <TableItemDate {...restProps.dateProps}>{formateDate(item.update)}</TableItemDate>
            </td>
            <td>
              <TableItemButton
                type="button"
                onClick={() => {
                  handleModal(true);
                  setCurrentItem(item);
                }}
              >
                <img src={icon} alt=">" />
              </TableItemButton>
            </td>
          </TableItem>
        ))}
    </>
  );
};

export const MarketplaceList: React.FC<IMarketplaceListProps> = ({
  title,
  placeholder,
  items,
  pagination,
  ...restProps
}) => {
  const { isDarkTheme } = React.useContext(ThemeContext);
  const marketplaceAssets = marketplaceThemedAssets(isDarkTheme || false);

  const [modalOpen, setModalOpen] = useState(false);
  const [pages, setPages] = useState<IMarketplaceItemProps[][]>([[]]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItem, setCurrentItem] = useState<IMarketplaceItemProps>();

  const pageSize = pagination || 5;
  const pageCount = items ? Math.ceil(items.length / pageSize) : 1;

  const handleModal = (state: boolean) => {
    toggleLockBodyScroll(state);
    setModalOpen(state);
  };

  useEffect(() => {
    const itemsCopy = [...items];
    const pagesData = [];

    while (itemsCopy.length) {
      pagesData.push(itemsCopy.splice(0, pageSize));
    }

    setPages(pagesData);
  }, [items]);

  return (
    <Wrapper {...restProps.wrapperProps}>
      <Container {...restProps.containerProps}>
        {title && <Title {...restProps.titleProps}>{title}</Title>}
        {!pages[currentPage] || !pages[currentPage].length ? (
          <Placeholder {...restProps.placeholderProps}>{placeholder}</Placeholder>
        ) : (
          <>
            <Table>
              <TableHeader>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Last Update</th>
                  <th></th>
                </tr>
              </TableHeader>
              <TableBody>
                <TableItems
                  items={pages[currentPage]}
                  icon={marketplaceAssets.caret}
                  setCurrentItem={setCurrentItem}
                  handleModal={handleModal}
                  {...restProps.itemProps}
                />
              </TableBody>
            </Table>

            {pageCount > 1 && (
              <TablePagination>
                <ReactPaginate
                  {...{
                    pageCount: pageCount,
                    pageRangeDisplayed: 3,
                    marginPagesDisplayed: 1,
                    onPageChange: (page) => setCurrentPage(page.selected),
                  }}
                />
              </TablePagination>
            )}

            {currentItem && (
              <Modal
                {...currentItem.modal.header}
                title={currentItem.title}
                placement="bottom-wide"
                visible={modalOpen}
                onCancel={() => handleModal(false)}
              >
                {typeof currentItem.modal.content === 'string'
                  ? currentItem.modal.content
                  : typeof currentItem.modal.content === 'function'
                  ? currentItem.modal.content()
                  : currentItem.modal.content || null}
              </Modal>
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
};
