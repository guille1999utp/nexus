import "./style.css";

interface GradientBlurProps {
    position: 'top' | 'bottom';
}

const GradientBlur: React.FC<GradientBlurProps> = ({ position }) => {
    const className = position === 'top' ? 'gradient-blur-top' : 'gradient-blur-bottom';

    return (
        <div className={className}>
            {[...Array(6)].map((_, index) => (
                <div key={index} />
            ))}
        </div>
    );
};

export default GradientBlur;
