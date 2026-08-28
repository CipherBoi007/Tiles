import { categorySchema, subCategorySchema, tileSchema, enquirySchema } from '../../../backend/src/schemas';

describe('Unit Tests - Validation Schemas & Business Logic', () => {
  describe('Category Schema Validation', () => {
    it('should validate a valid category payload', () => {
      const validPayload = {
        name: 'Vitrified Floor Tiles',
        desc: 'High quality vitrified floor tiles for living rooms.',
        image: 'https://example.com/tile.jpg',
        slug: 'vitrified-floor-tiles',
        status: 'active'
      };
      const result = categorySchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it('should reject a category payload missing required name', () => {
      const invalidPayload = {
        desc: 'Missing name category'
      };
      const result = categorySchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
    });

    it('should reject an empty string for category name', () => {
      const invalidPayload = {
        name: ''
      };
      const result = categorySchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
    });
  });

  describe('SubCategory Schema Validation', () => {
    it('should validate a valid subcategory payload', () => {
      const validPayload = {
        name: 'Glazed Vitrified (GVT/PGVT)',
        desc: 'Polished mirror finish tiles.',
        image: 'https://example.com/gvt.jpg',
        slug: 'glazed-vitrified',
        categoryId: 1
      };
      const result = subCategorySchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it('should reject a subcategory without categoryId', () => {
      const invalidPayload = {
        name: 'Glazed Vitrified',
        desc: 'Polished mirror finish tiles.'
      };
      const result = subCategorySchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
    });
  });

  describe('Tile Product Schema Validation', () => {
    it('should validate a valid tile product payload', () => {
      const validPayload = {
        name: 'Carrara White Marble',
        subCategoryId: 1,
        size: '600x1200 mm',
        finish: 'High Gloss',
        palette: 'White, Gray',
        thickness: '9mm',
        image: 'https://example.com/carrara.jpg',
        desc: 'Italian marble tile design.'
      };
      const result = tileSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it('should fail when tile name is missing or empty', () => {
      const invalidPayload = {
        subCategoryId: 1,
        image: 'https://example.com/carrara.jpg'
      };
      const result = tileSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
    });
  });

  describe('Enquiry Schema Validation', () => {
    it('should validate a valid customer enquiry', () => {
      const validPayload = {
        customer: 'John Doe',
        phone: '+91 98765 43210',
        description: 'Inquiring about 1500 sq.ft Carrara White Marble.'
      };
      const result = enquirySchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it('should reject enquiry with short customer name', () => {
      const invalidPayload = {
        customer: 'A',
        phone: '+91 98765 43210',
        description: 'Test enquiry'
      };
      const result = enquirySchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
    });
  });
});
