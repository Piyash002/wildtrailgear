
interface HeaderTitleProps {
    header: string;
    title: string;
}
const HeaderTitle = ({ header, title }: HeaderTitleProps) => {
    return (
        <div>
             <h1 className="text-2xl font-bold mb-3 text-center text-gray-800 dark:text-gray-200">{header}</h1>
      <h3 className="text-center font-body mb-2">{title}</h3>
        </div>
    );
};

export default HeaderTitle;