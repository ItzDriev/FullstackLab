import type { Request, Response } from "express";
import { Service } from "../models/Service.ts";

//Public: the list rendered on the services page
export async function getServices(_req: Request, res: Response) {
  try {
    const services = await Service.find({ active: true }).sort({
      displayOrder: 1,
    });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch services" });
  }
}

//Public: one service, looked up by the slug used in the booking url
export async function getServiceBySlug(req: Request, res: Response) {
  try {
    const service = await Service.findOne({ slug: req.params.slug });

    if (!service) {
      res.status(404).json({ success: false, error: "Service not found" });
      return;
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch service" });
  }
}

/*
  Turns "Macro & UI Assistance" into "macro-ui-assistance" so the admin
  never has to hand write a url safe slug.
*/
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

//Admin only: create a new service
export async function createService(req: Request, res: Response) {
  try {
    const { name, description, priceSek, durationMinutes, deliverables } =
      req.body;

    if (!name || !description || priceSek == null || durationMinutes == null) {
      res.status(400).json({
        success: false,
        error: "name, description, priceSek and durationMinutes are required",
      });
      return;
    }

    if (typeof name !== "string" || name.trim().length < 3) {
      res
        .status(400)
        .json({ success: false, error: "Name must be at least 3 characters" });
      return;
    }

    if (typeof description !== "string" || description.trim().length < 20) {
      res.status(400).json({
        success: false,
        error: "Description must be at least 20 characters",
      });
      return;
    }

    const price = Number(priceSek);
    if (isNaN(price) || price < 0) {
      res
        .status(400)
        .json({ success: false, error: "Price must be a positive number" });
      return;
    }

    const duration = Number(durationMinutes);
    if (isNaN(duration) || duration < 15 || duration > 480) {
      res.status(400).json({
        success: false,
        error: "Duration must be between 15 and 480 minutes",
      });
      return;
    }

    const slug = slugify(name);
    if (!slug) {
      res
        .status(400)
        .json({ success: false, error: "Name must contain letters or numbers" });
      return;
    }

    //Both name and slug are unique, so report the clash rather than throwing
    const existing = await Service.findOne({ $or: [{ name }, { slug }] });
    if (existing) {
      res
        .status(409)
        .json({ success: false, error: "A service with that name exists" });
      return;
    }

    const service = await Service.create({
      name: name.trim(),
      slug,
      description: description.trim(),
      deliverables: Array.isArray(deliverables)
        ? deliverables.map((d: string) => d.trim()).filter(Boolean)
        : [],
      priceSek: price,
      durationMinutes: duration,
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create service" });
  }
}

//Admin only: remove a service
export async function deleteService(req: Request, res: Response) {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      res.status(404).json({ success: false, error: "Service not found" });
      return;
    }

    res.status(200).json({ success: true, data: { _id: req.params.id } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to delete service" });
  }
}
