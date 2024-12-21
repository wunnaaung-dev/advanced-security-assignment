import React, { useEffect, useState } from 'react';

interface Image {
    id: string;
    src: string;
    isTarget?: boolean;
    type?: string;
}

interface ImagesData {
    [category: string]: Image[];
}

interface ImageCaptchaProps {
    onValidate?: (isValid: boolean) => void;
    onSuccess: () => void;
}

const imageData: ImagesData = {
    cars: [
        { id: "car1", src: '/src/assets/captcha/cars/car1.jpg' },
        { id: "car2", src: '/src/assets/captcha/cars/car2.jpg' },
        { id: "car3", src: '/src/assets/captcha/cars/car3.jpg' },
        { id: "car4", src: '/src/assets/captcha/cars/car4.jpg' },
        { id: "car5", src: '/src/assets/captcha/cars/car5.jpg' },
    ],
    buildings: [
        { id: "building1", src: '/src/assets/captcha/buildings/building1.jpg' },
        { id: "building2", src: '/src/assets/captcha/buildings/building2.jpg' },
        { id: "building3", src: '/src/assets/captcha/buildings/building3.jpg' },
        { id: "building4", src: '/src/assets/captcha/buildings/building4.jpg' },
        { id: "building5", src: '/src/assets/captcha/buildings/building5.jpg' },
    ],
    cats: [
        { id: "cat1", src: '/src/assets/captcha/cats/cat1.jpg' },
        { id: "cat2", src: '/src/assets/captcha/cats/cat2.jpg' },
        { id: "cat3", src: '/src/assets/captcha/cats/cat3.jpg' },
        { id: "cat4", src: '/src/assets/captcha/cats/cat4.jpg' },
        { id: "cat5", src: '/src/assets/captcha/cats/cat5.jpg' },
    ],
};

const ImageCaptcha: React.FC<ImageCaptchaProps> = ({ onValidate, onSuccess }) => {
    const [displayedImages, setDisplayedImages] = useState<Image[]>([]);
    const [targetCategory, setTargetCategory] = useState<string>("");
    const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [attemptCount, setAttemptCount] = useState<number>(1);
    const [successCount, setSuccessCount] = useState<number>(0);
    const [showRetry, setShowRetry] = useState<boolean>(false);

    const getRandomImages = (category: string, count: number): Image[] => {
        const images = [...imageData[category]];
        const selected: Image[] = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * images.length);
            selected.push({
                ...images[randomIndex],
                isTarget: true,
                type: category
            });
            images.splice(randomIndex, 1);
        }
        return selected;
    };

    const generateCaptcha = (keepCategory: boolean = false): void => {
        const categories = Object.keys(imageData);
        const targetCat = keepCategory ? targetCategory : categories[Math.floor(Math.random() * categories.length)];
        setTargetCategory(targetCat);

        const targetImages = getRandomImages(targetCat, 3);

        const otherCategories = categories.filter(cat => cat !== targetCat);
        const distractorImages: Image[] = [];

        otherCategories.forEach(category => {
            const images = getRandomImages(category, 3);
            distractorImages.push(...images.map(img => ({ ...img, isTarget: false })));
        });

        const allImages = [...targetImages, ...distractorImages]
            .sort(() => Math.random() - 0.5)
            .slice(0, 9);

        setDisplayedImages(allImages);
        setSelectedImages(new Set());
        setIsChecked(false);
        setIsValid(false);
        setShowRetry(false);
    };

    const handleImageClick = (imageId: string): void => {
        if (!isChecked) {
            const newSelected = new Set(selectedImages);
            if (newSelected.has(imageId)) {
                newSelected.delete(imageId);
            } else {
                newSelected.add(imageId);
            }
            setSelectedImages(newSelected);
        }
    };

    const validateSelection = (): void => {
        const correctSelections = displayedImages.filter(img => img.isTarget).map(img => img.id);
        const isCorrect = correctSelections.every(id => selectedImages.has(id)) && selectedImages.size === correctSelections.length;

        setIsValid(isCorrect);
        setIsChecked(true);

        if (isCorrect) {
            const newSuccessCount = successCount + 1;
            setSuccessCount(newSuccessCount);

            if (newSuccessCount < 2) {
                setTimeout(() => {
                    setAttemptCount(attemptCount + 1);
                    generateCaptcha(true);
                }, 1000);
            } else {
                if (onValidate) {
                    onValidate(true);
                }
                onSuccess()
            }
        } else {
            if (attemptCount === 2) {
                setShowRetry(true);
            } else {
                setTimeout(() => {
                    setAttemptCount(attemptCount + 1);
                    generateCaptcha(true);
                }, 1000);
            }
        }
    };

    const handleRetry = (): void => {
        setSuccessCount(0);
        setAttemptCount(1);
        setShowRetry(false);
        generateCaptcha(false);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const showVerifyButton = !isChecked || (isValid && successCount === 1);

    return (
        <div className="rounded-xl shadow-sm bg-slate-100">
            <div className="bg-blue-500 rounded-t-md h-20 text-white py-3 px-4">
                <p>Select all images with</p>
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{targetCategory}</h3>
                    <span className="text-sm">Attempt {attemptCount}/2</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-3 px-3">
                {displayedImages.map((image) => (
                    <div key={image.id} onClick={() => handleImageClick(image.id)} className={`
                        aspect-square border rounded-lg cursor-pointer
                        ${selectedImages.has(image.id) ? 'border-4 border-blue-500' : 'border-gray-200'}
                        ${isChecked && image.isTarget ? 'bg-green-100' : ''}
                        overflow-hidden relative
                      `}>
                        <img src={image.src} alt={`CAPTCHA ${image.type}`} className='w-full h-full object-cover' />
                    </div>
                ))}
            </div>

            <div className='flex justify-between items-center mt-3 px-3 pb-3'>
                {showRetry && <span className="text-red-600">Verification failed! Try again</span>}
                <div className="text-sm text-gray-600">
                    {successCount === 1 && !isChecked && "One more verification needed!"}
                </div>
                {showRetry ? (
                    <button
                        onClick={handleRetry}
                        className="py-2 px-3 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Try Again
                    </button>
                ) : (
                    <button
                        onClick={validateSelection}
                        className="py-2 px-5 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        disabled={selectedImages.size === 0 || (isChecked && !showVerifyButton)}
                    >
                        Verify
                    </button>
                )}
            </div>
        </div>
        
    );
};

export default ImageCaptcha;