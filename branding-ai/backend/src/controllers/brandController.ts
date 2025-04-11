import { Request, Response } from 'express';
import Brand from '../models/Brand';

type BrandRequest = Request<{}, {}, {
  brandName: string;
  mission: string;
  vision: string;
  industries: string[];
  style: string;
}>;

export const createBrand = async (req: BrandRequest, res: Response): Promise<void> => {
  try {
    console.log('Received brand data:', req.body);
    const { brandName, mission, vision, industries, style } = req.body;
    const userId = (req as any).user.userId; // This will come from the auth middleware
    console.log('User ID from token:', userId);

    const brand = new Brand({
      userId,
      brandName,
      mission,
      vision,
      industries,
      style
    });

    console.log('Attempting to save brand:', brand);
    await brand.save();
    console.log('Brand saved successfully');

    res.status(201).json({
      message: 'Brand information saved successfully',
      brand
    });
  } catch (error) {
    console.error('Error saving brand:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ message: 'Error saving brand information' });
  }
};

export const getBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    console.log('Fetching brand for user ID:', userId);
    const brand = await Brand.findOne({ userId });

    if (!brand) {
      console.log('No brand found for user ID:', userId);
      res.status(404).json({ message: 'Brand information not found' });
      return;
    }

    console.log('Brand found:', brand);
    res.json(brand);
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({ message: 'Error fetching brand information' });
  }
}; 